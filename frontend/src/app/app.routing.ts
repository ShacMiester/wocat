import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component";
import { ExportdataComponent } from "../app/exportdata/exportdata.component";
import { AppComponent } from "../app/app.component";
import { HomeComponent } from "../app/home/home.component";
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'export-data', component: ExportdataComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }