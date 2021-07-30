import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAuthGuard } from '@guards/no-auth.guard';

import { LayoutComponent } from '@components/layout/layout.component';

import { CardIndexComponent } from '@pages/cards/card-index.component';
import { CardNewComponent } from '@pages/cards/card-new.component';

import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';
import { Error404Component } from '@pages/error/error-404.component';
import { Error500Component } from '@pages/error/error-500.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: CardIndexComponent },
      { path: 'cartoes/adicionar', component: CardNewComponent },
    ]
  },
  { path: 'termos-de-uso', component: TermsOfUseComponent },
  { path: '500', component: Error500Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
