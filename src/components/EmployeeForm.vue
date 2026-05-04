<template>
  <div class="card shadow-sm mb-4">

    <!-- Card Header -->
    <div :class="['card-header', 'text-white', editMode ? 'bg-warning' : 'bg-success']">
      <h5 class="mb-0">{{ editMode ? '✏️ Edit Employee' : '➕ Add New Employee' }}</h5>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <div class="row g-3">

        <!-- Employee ID -->
        <div class="col-md-4">
          <label class="form-label fw-semibold">Employee ID <span class="text-danger">*</span></label>
          <input
            v-model.trim="form.empId"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.empId }"
            placeholder="e.g. EMP001"
            :disabled="editMode"
          />
          <div class="invalid-feedback">{{ errors.empId }}</div>
        </div>

        <!-- Name -->
        <div class="col-md-4">
          <label class="form-label fw-semibold">Full Name <span class="text-danger">*</span></label>
          <input
            v-model.trim="form.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            placeholder="e.g. Ravi Kumar"
          />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>

        <!-- Designation -->
        <div class="col-md-4">
          <label class="form-label fw-semibold">Designation <span class="text-danger">*</span></label>
          <input
            v-model.trim="form.designation"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.designation }"
            placeholder="e.g. Software Engineer"
          />
          <div class="invalid-feedback">{{ errors.designation }}</div>
        </div>

        <!-- Department -->
        <div class="col-md-4">
          <label class="form-label fw-semibold">Department <span class="text-danger">*</span></label>
          <select
            v-model="form.department"
            class="form-select"
            :class="{ 'is-invalid': errors.department }"
          >
            <option value="">-- Select Department --</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Operations</option>
            <option>Sales</option>
          </select>
          <div class="invalid-feedback">{{ errors.department }}</div>
        </div>

        <!-- Salary -->
        <div class="col-md-4">
          <label class="form-label fw-semibold">Salary (₹) <span class="text-danger">*</span></label>
          <input
            v-model.number="form.salary"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.salary }"
            placeholder="e.g. 50000"
            min="1"
          />
          <div class="invalid-feedback">{{ errors.salary }}</div>
        </div>

        <!-- Buttons -->
        <div class="col-md-4 d-flex align-items-end gap-2">
          <button
            class="btn flex-grow-1"
            :class="editMode ? 'btn-warning' : 'btn-success'"
            @click="handleSubmit"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
            {{ editMode ? 'Update Employee' : 'Add Employee' }}
          </button>
          <button
            v-if="editMode"
            class="btn btn-outline-secondary"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',

  props: {
    editMode:     { type: Boolean, default: false },
    employeeData: { type: Object,  default: null  }
  },

  data() {
    return {
      form: {
        empId:       '',
        name:        '',
        designation: '',
        department:  '',
        salary:      ''
      },
      errors:  {},
      loading: false
    }
  },

  watch: {
    // When parent sends employee data for editing, fill the form
    employeeData(val) {
      if (val) {
        this.form   = { ...val }
        this.errors = {}
      }
    }
  },

  methods: {
    // Validate all fields before submitting
    validate() {
      this.errors = {}
      if (!this.form.empId)       this.errors.empId       = 'Employee ID is required'
      if (!this.form.name)        this.errors.name        = 'Name is required'
      if (!this.form.designation) this.errors.designation = 'Designation is required'
      if (!this.form.department)  this.errors.department  = 'Department is required'
      if (!this.form.salary || this.form.salary <= 0)
                                  this.errors.salary      = 'Enter a valid salary'
      return Object.keys(this.errors).length === 0
    },

    async handleSubmit() {
      if (!this.validate()) return
      this.loading = true
      this.$emit('submit', { ...this.form })
      this.loading = false
      if (!this.editMode) this.resetForm()
    },

    resetForm() {
      this.form   = { empId: '', name: '', designation: '', department: '', salary: '' }
      this.errors = {}
    }
  }
}
</script>
