import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';


// this config does not cover all the design tokens used in the app
// it is just an example to show how to define a custom preset
// you can add more tokens as needed

export const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{amber.50}',
          100: '{amber.100}',
          200: '{amber.200}',
          300: '{amber.300}',
          400: '{amber.400}',
          500: '{amber.600}',
          600: '{amber.500}',
          700: '{amber.700}',
          800: '{amber.800}',
          900: '{amber.900}',
          950: '{amber.950}'
      }
  }
});
