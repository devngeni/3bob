<template>
  <div class="row">
    <div class="card-body">
      <div class="transaction-table">
        <div class="table-responsive">
          <div class="col-12">
            <table
              class="table dt-responsive wrap dataTable no-footer"
              role="grid"
            >
              <slot name="theader"> default header </slot>
              <slot name="tcontent"> default Table Body </slot>
            </table>
          </div>
        </div>
      </div>
      <div class="row" style="display: flex; justify-content: space-between">
        <!-- <div class="col-sm-12 col-md-5">
          <div class="dataTables_info" role="status" aria-live="polite">
            Showing {{ limit }} Records
          </div>
        </div> -->
        <div class="col-sm-12 col-md-7">
          <div class="dataTables_paginate paging_simple_numbers">
            <b-pagination
              v-model="currentPage"
              :total-rows="rowCount"
              :per-page="limit"
              @change="handlePageChange"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              size="lg"
              last-text="Last"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchURL: { type: String, required: true },
    limit: { type: Number, default: () => 10 },
    rowCount: { default: () => 10 },
    currentPage: { default: () => 1 },
  },
  data() {
    return {
      search: '',
    }
  },

  methods: {
    handlePageChange(pageNum) {
      this.$emit('next-page-handler', pageNum)
    },
    chooseLimit(event) {
      this.$emit('limit-records', event)
    },

    async clearSearchField(event) {
      if (event.target.value === '') {
        const { data } = await this.$axios.get(`${this.searchURL}`)
        this.$emit('table-search-results', data)
      }
    },

    recordSearch() {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()
        try {
          if (this.search) {
            const { data } = await this.$axios.get(
              `${this.searchURL}?search=${this.search}`
            )

            this.$emit('table-search-results', data)
          } else {
            this.$toast.error(`Please provide your search text`)
          }
          this.$nuxt.$loading.finish()
        } catch ({ response }) {
          this.$nuxt.$loading.finish()
          const { errors } = response.data
          errors.forEach((err) => {
            this.$toast.error(err.message)
          })
          this.$nuxt.$loading.finish()
        }
      })
    },
  },
}
</script>

<style>
ul.pagination li a {
  position: relative;
  display: block;
  /* padding: 0.5rem 0.75rem; */
  margin-left: -1px;
  line-height: 1.25;
  color: #323a46;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

button {
  padding: 5px 2px !important;
  display: inline-block;
  /* border-radius: 50px; */
  min-width: 130px;
  font-size: 16px;
  font-weight: 500;
  padding: 1px;
  color: #fff;
}
.pagination li.active {
  z-index: 1;
  color: #fff;
  border: 1px solid #ced4da !important;
  background-color: #6658dd !important;
  border-color: #6658dd !important;
}
[type='search'] {
  outline-offset: -2px;
  -webkit-appearance: none;
}
div.dataTables_wrapper div.dataTables_filter input {
  margin-left: 0.5em;
  display: inline-block;
  width: auto;
}

.form-control {
  color: #fff;
}
</style>
