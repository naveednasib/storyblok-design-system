import { SbDataTableInput } from '.'

import SbIcon from '../../Icon'

/**
 * SbDataTableHeaderCell
 *
 * Render a th element
 */
export const SbDataTableHeaderCell = {
  name: 'SbDataTableHeaderCell',

  data: () => ({
    order: 0,
  }),

  iconsSort: ['chevron-down', 'chevron-sort', 'chevron-up'],

  props: {
    column: {
      type: Object,
    },
    sortedKey: {
      type: String,
    },
  },

  computed: {
    context() {
      return this.dataTableContext()
    },

    isSortable() {
      return this.column.sortable
    },

    isSortedKey() {
      return this.sortKey === this.sortedKey
    },

    showSortIcon() {
      return this.isSortable && this.order && this.isSortedKey
    },

    sortKey() {
      return this.column.value
    },
  },

  methods: {
    toggleSort() {
      if (this.sortKey && this.isSortable) {
        this.order = this.order === 0 || this.order === -1 ? this.order + 1 : -1
        this.context.toggleTableOrder(this.order, this.sortKey)
      } else if (!this.sortKey && this.isSortable) {
        throw new Error(
          'Must provide the value property when sortable is defined.'
        )
      }
    },
  },

  watch: {
    sortedKey() {
      if (!this.isSortedKey) this.order = 0
    },
  },

  inject: ['dataTableContext'],

  render(h) {
    return h(
      'th',
      {
        staticClass: 'sb-data-table__head-cell',
        class: {
          'sb-data-table--show-icon': this.showSortIcon,
        },
        on: {
          click: this.toggleSort,
        },
      },
      [
        this.column.text,
        this.isSortable &&
          h(SbIcon, {
            class: 'sb-data-table__sort-icon',
            props: {
              size: 'small',
              name: this.$options.iconsSort[this.order + 1],
            },
          }),
      ]
    )
  },
}

/**
 * SbDataTableHeaderRow
 *
 * Render a tr header element
 */
export const SbDataTableHeaderRow = {
  name: 'SbDataTableHeaderRow',

  props: {
    allowSelection: {
      type: Boolean,
    },
    allRowsSelected: {
      required: false,
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
    },
    selectionMode: {
      type: String,
    },
    sortedKey: {
      type: String,
    },
  },

  computed: {
    context() {
      return this.dataTableContext()
    },
  },

  methods: {
    handleAllRowsSelected() {
      this.allRowsSelected
        ? this.context.deselectAll()
        : this.context.selectAll()
    },
  },

  inject: ['dataTableContext'],

  render(h) {
    return h('tr', [
      this.allowSelection &&
        h(
          'th',
          {
            staticClass: 'sb-data-table__head-cell',
          },
          [
            this.selectionMode === 'multiple' &&
              h(SbDataTableInput, {
                props: {
                  value: this.allRowsSelected,
                },
                on: {
                  click: this.handleAllRowsSelected,
                },
              }),
          ]
        ),
      this.headers.map((elem) => {
        return h(SbDataTableHeaderCell, {
          props: {
            column: elem,
            sortedKey: this.sortedKey,
          },
        })
      }),
    ])
  },
}

/**
 * SbDataTableHeader
 *
 * Render a thead element
 */
export const SbDataTableHeader = {
  name: 'SbDataTableHeader',

  props: {
    allowSelection: {
      required: false,
      type: Boolean,
    },
    allRowsSelected: {
      required: false,
      type: Boolean,
      default: false,
    },
    headers: {
      required: false,
      type: Array,
    },
    selectionMode: {
      required: false,
      type: String,
    },
    sortedKey: {
      required: false,
      type: String,
    },
  },

  render(h) {
    return h('thead', [
      h(SbDataTableHeaderRow, {
        props: {
          allowSelection: this.allowSelection,
          allRowsSelected: this.allRowsSelected,
          headers: this.headers,
          selectedRows: this.selectedRows,
          selectionMode: this.selectionMode,
          sortedKey: this.sortedKey,
        },
      }),
    ])
  },
}