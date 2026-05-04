<template>
  <div id="app">

    <!-- Navbar -->
    <nav class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container-fluid px-4">
        <span class="navbar-brand fw-bold fs-5">🏢 Employee Management System</span>
        <span class="text-white-50 small d-none d-md-inline">Web Programming – Assignment 2</span>
      </div>
    </nav>

    <div class="container my-4">

      <!-- Toast Notification -->
      <div
        v-if="toast.show"
        :class="'alert alert-' + toast.type + ' alert-dismissible fade show'"
        role="alert"
      >
        {{ toast.message }}
        <button type="button" class="btn-close" @click="toast.show = false"></button>
      </div>

      <!-- Add / Edit Form -->
      <EmployeeForm
        :edit-mode="editMode"
        :employee-data="selectedEmployee"
        @submit="handleSubmit"
        @cancel="cancelEdit"
      />

      <!-- Employee Table -->
      <EmployeeTable
        :employees="employees"
        :loading="tableLoading"
        @edit="startEdit"
        @delete="handleDelete"
      />

    </div>
  </div>
</template>

<script>
import EmployeeForm  from './components/EmployeeForm.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from './api.js'

export default {
  name: 'App',

  components: {
    EmployeeForm,
    EmployeeTable
  },

  data() {
    return {
      employees:        [],
      editMode:         false,
      selectedEmployee: null,
      tableLoading:     false,
      toast: {
        show:    false,
        message: '',
        type:    'success'
      }
    }
  },

  // Fetch all employees when app loads
  mounted() {
    this.fetchEmployees()
  },

  methods: {

    // READ – fetch all employees from MockAPI
    async fetchEmployees() {
      this.tableLoading = true
      try {
        const res      = await getAllEmployees()
        this.employees = res.data
      } catch (err) {
        this.showToast('❌ Could not fetch employees. Check MockAPI URL in api.js', 'danger')
      } finally {
        this.tableLoading = false
      }
    },

    // CREATE or UPDATE depending on editMode
    async handleSubmit(formData) {
      try {
        if (this.editMode) {
          await updateEmployee(this.selectedEmployee.id, formData)
          this.showToast('✅ ' + formData.name + ' updated successfully!', 'success')
          this.cancelEdit()
        } else {
          await createEmployee(formData)
          this.showToast('✅ ' + formData.name + ' added successfully!', 'success')
        }
        await this.fetchEmployees()
      } catch (err) {
        this.showToast('❌ Operation failed. Please try again.', 'danger')
      }
    },

    // Set edit mode and fill form with selected employee
    startEdit(emp) {
      this.selectedEmployee = Object.assign({}, emp)
      this.editMode         = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    // Cancel editing
    cancelEdit() {
      this.editMode         = false
      this.selectedEmployee = null
    },

    // DELETE employee by id
    async handleDelete(id) {
      if (!confirm('Are you sure you want to delete this employee?')) return
      try {
        await deleteEmployee(id)
        this.showToast('🗑️ Employee deleted successfully!', 'warning')
        await this.fetchEmployees()
      } catch (err) {
        this.showToast('❌ Failed to delete. Please try again.', 'danger')
      }
    },

    // Show alert notification for 4 seconds
    showToast(message, type) {
      this.toast = { show: true, message: message, type: type || 'success' }
      setTimeout(() => { this.toast.show = false }, 4000)
    }
  }
}
</script>

<style>
body {
  background-color: #f0f2f5;
  font-family: 'Segoe UI', sans-serif;
}
</style>
