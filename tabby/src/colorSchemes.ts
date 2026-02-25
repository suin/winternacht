import { Injectable } from '@angular/core'
import { TerminalColorSchemeProvider, TerminalColorScheme } from 'tabby-terminal'

@Injectable()
export class WinternachtColorSchemes extends TerminalColorSchemeProvider {
  async getSchemes(): Promise<TerminalColorScheme[]> {
    return [
      {
        name: 'Winternacht',
        foreground: '#D6D3CE',
        background: '#1A1917',
        cursor: '#8CC3CB',
        colors: [
          '#242320', // 0  black         (neutral-900)
          '#B87070', // 1  red           (clay-300)
          '#7A9E72', // 2  green         (sage-300)
          '#C29E5E', // 3  yellow        (sand-300)
          '#6B8BBF', // 4  blue          (slate-300)
          '#8A7EB0', // 5  magenta       (lavender-300)
          '#5F9EA8', // 6  cyan          (accent-300)
          '#D5D3CF', // 7  white         (neutral-300)
          '#7A7672', // 8  bright black  (neutral-500)
          '#D4A0A0', // 9  bright red    (clay lightened)
          '#A0C496', // 10 bright green  (sage lightened)
          '#D4B87A', // 11 bright yellow (sand lightened)
          '#8DAFD4', // 12 bright blue   (slate lightened)
          '#B0A4D0', // 13 bright magenta(lavender lightened)
          '#8CC3CB', // 14 bright cyan   (accent-200)
          '#FCFCFB', // 15 bright white  (neutral-50)
        ],
      },
      {
        name: 'Winternacht Light',
        foreground: '#3A3835',
        background: '#FCFCFB',
        cursor: '#5F9EA8',
        colors: [
          '#3A3835', // 0  black         (neutral-800)
          '#8E5050', // 1  red           (clay-500)
          '#587850', // 2  green         (sage-500)
          '#8E7040', // 3  yellow        (sand-500)
          '#4A5870', // 4  blue          (slate-500)
          '#635788', // 5  magenta       (lavender-500)
          '#3D7A83', // 6  cyan          (accent-500)
          '#F1F0EE', // 7  white         (neutral-200)
          '#7A7672', // 8  bright black  (neutral-500)
          '#B87070', // 9  bright red    (clay-300)
          '#7A9E72', // 10 bright green  (sage-300)
          '#C29E5E', // 11 bright yellow (sand-300)
          '#6B8BBF', // 12 bright blue   (slate-300)
          '#8A7EB0', // 13 bright magenta(lavender-300)
          '#5F9EA8', // 14 bright cyan   (accent-300)
          '#FCFCFB', // 15 bright white  (neutral-50)
        ],
      },
    ]
  }
}
