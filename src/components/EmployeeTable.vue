<template>
  <div class="card shadow-sm">

    <!-- Header -->
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0">👥 Employee Records</h5>
      <span class="badge bg-light text-dark fs-6">Total: {{ employees.length }}</span>
    </div>

    <div class="card-body p-0">

      <!-- Search Bar -->
      <div class="p-3 border-bottom">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="🔍 Search by name, ID, department or designation..."
        />
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Fetching employees...</p>
      </div>

      <!-- No Records -->
      <div v-else-if="filteredEmployees.length === 0" class="text-center py-5">
        <p class="text-muted fs-5">No employee records found.</p>
      </div>

      <!-- Table -->
      <div v-else class="table-responsive">
        <table class="table table-striped table-hover align-middle mb-0">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Salary (₹)</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emp, index) in filteredEmployees" :key="emp.empId">
              <td class="text-muted">{{ index + 1 }}</td>
              <td><span class="badge bg-secondary">{{ emp.empId }}</span></td>
              <td class="fw-semibold">{{ emp.name }}</td>
              <td>{{ emp.designation }}</td>
              <td><span class="badge bg-info text-dark">{{ emp.department }}</span></td>
              <td class="fw-semibold text-success">{{ formatSalary(emp.salary) }}</td>
              <td class="text-center">
                <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', emp)">
                  ✏️ Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="$emit('delete', emp.id)">
                  🗑️ Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',

  props: {
    employees: { type: Array,   default: () => [] },
    loading:   { type: Boolean, default: false    }
  },

  data() {
    return { search: '' }
  },

  computed: {
    filteredEmployees() {
      const q = this.search.toLowerCase()
      if (!q) return this.employees
      return this.employees.filter(e =>
        (e.name        || '').toLowerCase().includes(q) ||
        (e.empId       || '').toLowerCase().includes(q) ||
        (e.department  || '').toLowerCase().includes(q) ||
        (e.designation || '').toLowerCase().includes(q)
      )
    }
  },

  methods: {
    formatSalary(val) {
      return '₹' + Number(val).toLocaleString('en-IN')
    }
  }
}
</script>
