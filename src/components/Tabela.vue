/* eslint-disable vue/require-v-for-key */
<template>
  <div>
    <table
      id="tabelaPessoa"
      class="table col-sm-12 table-striped table-bordered table-hover table-collapse cf"
    >
      <thead class="cf">
        <tr>
          <th
            v-for="field in fields"
            :key="field.key"
            v-column-sortable:field.id
            class="p-3 mb-2 bg-primary text-white"
            style="font-weight: bold; text-align: center;"
          >{{ field.label }}</th>
          <th
            class="p-3 mb-2 bg-primary text-white"
            style="font-weight: bold; text-align: center;"
          >Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in items" :key="data.id">
          <td
            v-for="field in fields"
            :key="field.id"
            data-title="key.label"
            class="p-3 mb-2 text-center"
          >{{ data[field.id] }}</td>

          <td data-title="Ações" class="text-center">
            <button
              class="btn btn-info btn-sm"
              title="Alterar dados"
              type="submit"
              @click="updateRegisterFromTable(data.id)"
            >
              <span class="fa fa-pencil"></span>
            </button>
            <button
              class="btn btn-danger btn-sm"
              title="Excluir dados"
              @click="deleteRegisterFromTable(data.id)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="box-footer clearfix">
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div class="pagination">
								<p>
									Mostrando <span class="badge badge-secondary" v-text="(this.pageSize * (this.pageIndex - 1) + 1)"></span>
                  de <span class="badge badge-secondary" v-text="this.goEnd() ?  this.totalCount : this.pageSize * ( this.pageIndex - 1) + this.pageSize"></span>
									de <span class="badge badge-secondary" v-text="this.totalCount"></span>
									Registros Cadastrados
								</p>
						</div>
          </div>
          <div class="col-xs-12 col-md-8 ">
            <ul class="pagination pull-right">
              <li @click="goFirst" :class="disabledPage(!firstPageEnable)">
                <a href="javascript:void 0" aria-label="Primeiro" class="page-link">
                  <span aria-hidden="true">Primeiro</span>
                </a>
              </li>
              <li @click="goPrevious" :class="disabledPage(!hasPreviousPage)">
                <a href="javascript:void 0" aria-label="Anterior" class="page-link">
                  <span aria-hidden="true">Anterior</span>
                </a>
              </li>
              <li
                v-for="page in showPageIndexRange()"
                :key="(page)"
                @click="goPage(startIndex() + page - 1)"
                :class="currentPage(startIndex() + page - 1)">
                <a href="javascript:void 0" class="page-item active">{{ startIndex() + page - 1 }}</a>
              </li>
              <li @click="goNext" :class="disabledPage(!hasNextPage)">
                <a href="javascript:void 0" aria-label="Próximo" class="page-link">
                  <span aria-hidden="true">Próximo</span>
                </a>
              </li>
              <li @click="goEnd" :class="disabledPage(!lastPageEnable)">
                <a href="javascript:void 0" aria-label="Última" class="page-link">
                  <span aria-hidden="true">Última</span>
                </a>
              </li>
            </ul>
          </div>
      </div>
      <div class="tile-footer">
        <button
          class="btn btn-info btn-sm"
          title="Incluir dados"
          @click="insertRegisterFromTable()" >
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import columnSortable from "vue-column-sortable";

export default {
  name: "Tabela",
  props: {
    fields: Array,
    items: Array,
    totalCount: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true,
      default:10
    },
   
  },
  data() {
    return {
      showPageNumber: 10,
      pageIndex: 1,
      pageIndexOutOfRange: false,
    };
  },
  /* eslint-disable no-console */
  methods: {
    insertRegisterFromTable() {
      this.$emit("insertRegisterFromTable");
    },
    updateRegisterFromTable(id) {
      this.$emit("updateRegisterFromTable", id);
    },
    deleteRegisterFromTable(id) {
      this.$emit("deleteRegisterFromTable", id);
    },
    orderBy(fn) {
      this.dataBase.sort(fn);
    },
    totalPage() {
      var totalPage = 0;
      var pages = parseInt(this.totalCount / this.pageSize);
      if (this.totalCount % this.pageSize > 0) {
        totalPage = ++pages;
      } else {
        totalPage = pages;
      }
      if (totalPage > 0 && this.pageIndex > totalPage) {
        this.pageIndex = 1;
        this.pageIndexOutOfRange = true;
      } else {
        this.pageIndexOutOfRange = false;
      }

      return totalPage;
    },
    innerStartIndex() {
      return this.pageIndex - this.showMiddleNumber;
    },
    innerEndIndex() {
      return this.pageIndex + this.showMiddleNumber;
    },
    startIndex() {
      var start = this.innerStartIndex();
      var end = this.innerEndIndex();

      if (end > this.totalPage()) {
        start -= end - this.totalPage();
      }

      if (start < 1) {
        return 1;
      }

      return start + 1;
    },
    endIndex() {
      var start = this.innerStartIndex();
      var end = this.innerEndIndex();

      if (start < 0) {
        end += Math.abs(start);
      }

      if (end > this.totalPage()) {
        end = this.totalPage();
      }

      return end;
    },
    showPageIndexRange() {
      return this.endIndex() - this.startIndex() + 1;
    },
    currentPage(page) {
      return {
        active: this.pageIndex === page
      };
    },
    disabledPage(val) {
      return {
        disabled: val
      };
    },
    goFirst() {
      if (this.firstPageEnable) {
        this.goPage(1);
      }
    },
    goPrevious() {
      if (this.hasPreviousPage) {
        this.goPage(this.pageIndex - 1);
      }
    },
    goNext() {
      if (this.hasNextPage) {
        this.goPage(this.pageIndex + 1);
      }
    },
    goEnd() {
      if (this.lastPageEnable) {
        this.goPage(this.totalPage);
      }
    },
    goPage: function(page) {
      if (!this.pageIndexOutOfRange && page === this.pageIndex) {
          this.$emit("page", page);
      }
      this.pageIndex = page;
    }
  },
  computed: {
    hasPreviousPage: function() {
      return this.pageIndex > 1;
    },
    hasNextPage: function() {
      return this.pageIndex < this.totalPage;
    },
    firstPageEnable: function() {
      return this.pageIndexOutOfRange || this.hasPreviousPage;
    },
    lastPageEnable: function() {
      return this.pageIndexOutOfRange || this.hasNextPage;
    },
    showMiddleNumber: function() {
      return this.showPageNumber / 2;
    }
  },

  directives: {
    columnSortable
  },
 

  
};
</script>

<style scoped>

 .pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.pagination > li {
  display: inline;
}

.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.428571429;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #dddddd;
}

.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  background-color: #eeeeee;
}

.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  color: #ffffff;
  cursor: default;
  background-color: #428bca;
  border-color: #428bca;
}

.pagination > .disabled > span,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #999999;
  cursor: not-allowed;
  background-color: #ffffff;
  border-color: #dddddd;
}

.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
}

.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
}

.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
}

.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}

.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.pager {
  padding-left: 0;
  margin: 20px 0;
  text-align: center;
  list-style: none;
}

.pager:before,
.pager:after {
  display: table;
  content: " ";
}

.pager:after {
  clear: both;
}

.pager:before,
.pager:after {
  display: table;
  content: " ";
}

.pager:after {
  clear: both;
}

.pager li {
  display: inline;
}

.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 15px;
}

.pager li > a:hover,
.pager li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}

.pager .next > a,
.pager .next > span {
  float: right;
}

.pager .previous > a,
.pager .previous > span {
  float: left;
}

.pager .disabled > a,
.pager .disabled > a:hover,
.pager .disabled > a:focus,
.pager .disabled > span {
  color: #999999;
  cursor: not-allowed;
  background-color: #ffffff;
}
</style>