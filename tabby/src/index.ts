import { NgModule } from '@angular/core'
import { TerminalColorSchemeProvider } from 'tabby-terminal'
import { WinternachtColorSchemes } from './colorSchemes'

@NgModule({
  providers: [
    { provide: TerminalColorSchemeProvider, useClass: WinternachtColorSchemes, multi: true },
  ],
})
export default class WinternachtModule {}
