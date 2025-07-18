// src/app/components/appointment-form/appointment-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-patient',
  standalone: true, // Si vous utilisez les composants standalone
  imports: [
    CommonModule,
    ReactiveFormsModule, // Ajoutez ceci
    RouterModule
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  appointmentForm: FormGroup;
  isEditMode = false;
  appointmentId: number | null = null;
  hospitals: any[] = [];
  doctors: any[] = [];
  availableSlots: string[] = [];
  patients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      patient_id: ['', Validators.required],
      hospital_id: ['', Validators.required],
      doctor_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required],
      reason: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadHospitals();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.appointmentId = +params['id'];
        this.loadAppointment(this.appointmentId);
      }
    });

    this.appointmentForm.get('hospital_id')?.valueChanges.subscribe(hospitalId => {
      if (hospitalId) {
        this.loadDoctorsByHospital(hospitalId);
      }
    });

    this.appointmentForm.get('doctor_id')?.valueChanges.subscribe(doctorId => {
      const date = this.appointmentForm.get('appointment_date')?.value;
      if (doctorId && date) {
        this.loadAvailableSlots(doctorId, date);
      }
    });

    this.appointmentForm.get('appointment_date')?.valueChanges.subscribe(date => {
      const doctorId = this.appointmentForm.get('doctor_id')?.value;
      if (doctorId && date) {
        this.loadAvailableSlots(doctorId, date);
      }
    });
  }

  loadAppointment(id: number): void {
    this.appointmentService.getAppointment(id).subscribe(appointment => {
      const apptDate = new Date(appointment.appointment_date);
      this.appointmentForm.patchValue({
        patient_id: appointment.patient_id,
        hospital_id: appointment.hospital_id,
        doctor_id: appointment.doctor_id,
        appointment_date: apptDate.toISOString().split('T')[0],
        appointment_time: apptDate.toTimeString().substring(0, 5),
        reason: appointment.reason
      });
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  loadHospitals(): void {
    this.hospitalService.getAllHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
    });
  }

  loadDoctorsByHospital(hospitalId: number): void {
    this.appointmentService.getDoctorsByHospital(hospitalId).subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  loadAvailableSlots(doctorId: number, date: string): void {
    this.appointmentService.getAvailableSlots(doctorId, date).subscribe(slots => {
      this.availableSlots = slots;
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      const appointmentData = {
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        hospital_id: formData.hospital_id,
        appointment_date: `${formData.appointment_date} ${formData.appointment_time}:00`,
        reason: formData.reason
      };

      if (this.isEditMode && this.appointmentId) {
        this.appointmentService.updateAppointment(this.appointmentId, appointmentData).subscribe(() => {
          this.router.navigate(['/appointments']);
        });
      } else {
        this.appointmentService.createAppointment(appointmentData).subscribe(() => {
          this.router.navigate(['/appointments']);
        });
      }
    }
  }
}