import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppointmentService } from "../../services/appointment.service";
import { DoctorService } from "../../services/doctor.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Doctor } from "../../interfaces/doctor";
import { AuthService } from "@core";
import { format } from "date-fns";

@Component({
  selector: "app-appointment",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit {
setNextWeek() {
throw new Error('Method not implemented.');
}
getDateErrorMessage() {
throw new Error('Method not implemented.');
}
setToday() {
throw new Error('Method not implemented.');
}
isDateInvalid(): any {
throw new Error('Method not implemented.');
}
isLoadingSlots: any;
maxDate: any;
isSlotReserved(_t90: string): any {
throw new Error('Method not implemented.');
}
formatSlotDisplay(_t90: string) {
throw new Error('Method not implemented.');
}
today: string | number | Date | undefined;
selectTimeSlot(_t24: string) {
throw new Error('Method not implemented.');
}
  appointmentForm: FormGroup;
  isEditMode = false;
  appointmentId: number | null = null;
  doctors: Doctor[] = [];
  availableSlots: string[] = [];
  minDate: string;
  hospitalId = 1;
  specialities: string[] = [];
  errorMessage: string | null = null;
  isSubmitting = false; // Ajoutez cette ligne avec les autres variables
  successMessage: string | null = null; // Ajoutez cette ligne avec les autres variables
  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Service qui gère l'authentification
  ) {
    this.minDate = new Date().toISOString().split("T")[0];

    this.appointmentForm = this.fb.group({
      speciality: ["", Validators.required],
      doctor_id: ["", Validators.required],
      appointment_date: ["", Validators.required],
      slot: ["", Validators.required], // <-- Ajoute ce champ ici
      reason: [""],
    });
  }

  ngOnInit() {
    this.loadDoctors();
    this.setupFormListeners();

    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.isEditMode = true;
      this.appointmentId = id;
      this.loadAppointment(id);
    }
  }

  get filteredDoctors(): Doctor[] {
    const speciality = this.appointmentForm.get("speciality")?.value;
    if (!speciality) return [];

    return this.doctors
      .filter((d) => d.speciality === speciality)
      .sort((a, b) => {
        const nameA =
          `${a.user?.first_name} ${a.user?.last_name}`.toLowerCase();
        const nameB =
          `${b.user?.first_name} ${b.user?.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }

  setupFormListeners(): void {
    this.appointmentForm.get("speciality")?.valueChanges.subscribe(() => {
      const doctorControl = this.appointmentForm.get("doctor_id");
      const timeControl = this.appointmentForm.get("appointment_time");

      doctorControl?.reset();
      timeControl?.reset();
      timeControl?.disable();

      if (this.filteredDoctors.length === 0) {
        doctorControl?.disable();
      } else {
        doctorControl?.enable();
      }
    });

    this.appointmentForm
      .get("doctor_id")
      ?.valueChanges.subscribe((doctorId) => {
        const timeControl = this.appointmentForm.get("appointment_time");

        if (doctorId) {
          timeControl?.enable();
          this.loadAvailableSlots();
        } else {
          timeControl?.disable();
          this.availableSlots = [];
        }
      });

    this.appointmentForm.get("appointment_date")?.valueChanges.subscribe(() => {
      this.loadAvailableSlots();
    });
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors: Doctor[]) => {
        this.doctors = doctors;
        this.extractSpecialities();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des médecins", err);
        // Fallback en mode dev
        this.doctors = [
          {
            id: 1,
            user: { first_name: "Jean", last_name: "Dupont" },
            speciality: "Cardiologie",
            hospital_id: 1,
          },
        ];
        this.extractSpecialities();
      },
    });
  }

  extractSpecialities(): void {
    this.specialities = [
      ...new Set(this.doctors.map((d) => d.speciality).filter((s) => s)),
    ].sort();
  }

  loadAppointment(id: number): void {
    this.appointmentService.getAppointment(id).subscribe({
      next: (appointment) => {
        const apptDate = new Date(appointment.appointment_date);
        this.appointmentForm.patchValue({
          speciality: appointment.doctor?.speciality,
          doctor_id: appointment.doctor_id,
          appointment_date: apptDate.toISOString().split("T")[0],
          appointment_time: apptDate.toTimeString().substring(0, 5),
          reason: appointment.reason,
        });
      },
      error: (err) =>
        console.error("Erreur lors du chargement du rendez-vous", err),
    });
  }

  loadAvailableSlots(): void {
    const doctorId = this.appointmentForm.get("doctor_id")?.value;
    const date = this.appointmentForm.get("appointment_date")?.value;

    if (!doctorId || !date) {
      this.availableSlots = [];
      return;
    }

    // 🧪 Exemple local à remplacer par une vraie requête API :
    const simulatedSlots: Record<number, string[]> = {
      1: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      2: ["08:30", "09:30", "11:30", "13:30", "16:30"],
    };

    this.availableSlots = simulatedSlots[doctorId] || [];
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null; // Réinitialise le message de succès précédent

      const formData = this.appointmentForm.value;

      const dateTimeString = `${formData.appointment_date}T${formData.slot}`;
      const dateObj = new Date(dateTimeString);
      const mysqlDate = format(dateObj, "yyyy-MM-dd HH:mm:ss");

      const appointmentData = {
        doctor_id: formData.doctor_id,
        hospital_id: this.hospitalId,
        patient_id: this.authService.currentUserValue?.id,
        appointment_date: mysqlDate,
        reason: formData.reason,
      };

      const operation =
        this.isEditMode && this.appointmentId
          ? this.appointmentService.updateAppointment(
              this.appointmentId,
              appointmentData
            )
          : this.appointmentService.createAppointment(appointmentData);

      operation.subscribe({
        next: () => {
          this.successMessage = this.isEditMode
            ? "Rendez-vous mis à jour avec succès!"
            : "Rendez-vous créé avec succès!";

          if (!this.isEditMode) {
            this.appointmentForm.reset();
            this.availableSlots = [];
          }

          // Redirection après 3 secondes (optionnel)
          setTimeout(() => {
            this.router.navigate(["/patient/appointment"]);
          }, 3000);
        },
        error: (err) => {
          console.error("Full error:", err);
          this.errorMessage =
            err.error?.message ||
            err.message ||
            "Une erreur est survenue lors de l'enregistrement";
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }
  showError(message: string): void {
    this.errorMessage = message;
    console.warn(message);
  }
}
