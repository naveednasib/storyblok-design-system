import SbLink from './index'

export default {
  title: 'SbLink',
  component: SbLink,
  args: {
    type: 'primary',
    size: null,
    href: 'https://storyblok.com',
    label: 'Go to Storyblok website',
    as: undefined,
    title: null
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    label: {
      name: 'label',
      description: 'Label',
      control: {
        type: 'text'
      }
    },
    as: {
      name: 'as',
      description: 'The tag that should be used (<a> is default)',
      control: {
        type: 'text'
      }
    },
    href: {
      name: 'href',
      description: 'href attribute for <a> tag',
      control: {
        type: 'text'
      }
    },
    title: {
      name: 'title',
      description: 'Title to `SbLink`',
      control: {
        type: 'text'
      }
    },
    type: {
      name: 'type',
      description: '`SbLink` type',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    icon: {
      name: 'icon',
      description: 'Icon to `SbLink`',
      control: {
        type: 'text'
      }
    },
    iconBefore: {
      name: 'iconBefore',
      description: 'Icon before label',
      control: {
        type: 'text'
      }
    },
    iconAfter: {
      name: 'iconAfter',
      description: 'Icon after label',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = args => ({
  components: { SbLink },
  props: Object.keys(args),
  template: `
    <SbLink
      v-bind="{
        as,
        label,
        href,
        title,
        type
      }"
    />
  `
})

export const InlineLabel = args => ({
  components: { SbLink },
  props: Object.keys(args),
  template: `
    <SbLink
      v-bind="{
        as,
        href,
        title,
        type
      }"
    >
      {{ label }}
    </SbLink>
  `
})

// export const Secondary = args => ({
//   props: Object.keys(args),
//   components: { SbLink },
//   template: `<div>
//     <SbLink
//       v-bind="{
//         label,
//         type
//       }"
//     />
//   </div>`
// })

// Secondary.args = {
//   label: 'Secondary link button',
//   type: 'secondary'
// }

export const WithIcon = args => ({
  components: { SbLink },
  props: Object.keys(args),
  template: `<div>
      <div>
        <SbLink
          v-bind="{
            label: primaryLabel,
            href,
            title,
            iconBefore
          }"
        />
      </div>

      <div style="margin-top: 20px">
        <SbLink
          v-bind="{
            label: secondaryLabel,
            href,
            title,
            iconAfter,
            type: 'secondary'
          }"
        />
      </div>
  </div>`
})

WithIcon.args = {
  icon: 'checkmark',
  iconBefore: 'checkmark',
  iconAfter: 'calendar',
  primaryLabel: 'Icon before',
  secondaryLabel: 'Icon after'
}

WithIcon.argTypes = {
  primaryLabel: {
    control: {
      type: 'text'
    }
  },
  secondaryLabel: {
    control: {
      type: 'text'
    }
  }
}
