import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about-area/about/about.component';
import { ContactUsComponent } from './components/contact-us-area/contact-us/contact-us.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { AdminLayoutComponent } from './components/admin-area/admin-layout/admin-layout.component';
import { GraphComponent } from './components/admin-area/graph/graph.component';
import { StocksComponent } from './components/admin-area/stocks/stocks.component';
import { MapsComponent } from './components/admin-area/maps/maps.component';
import { FilterSearchComponent } from './components/admin-area/filter-search/filter-search.component';
import { GraphDirectiveComponent } from './components/admin-area/graph-directive/graph-directive.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "products", canActivate: [AuthGuard], component: ProductListComponent },
    { path: "products/details/:id", canActivate: [AuthGuard], component: ProductDetailsComponent },
    { path: "products/new", canActivate: [AuthGuard], component: AddProductComponent },
    { path: "products/edit/:id", component: UpdateProductComponent },
    { path: "about", component: AboutComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "admin", canActivate: [AuthGuard], component: AdminLayoutComponent },
    { path: "graph", canActivate: [AuthGuard], component: GraphComponent },
    { path: "graph-directive", canActivate: [AuthGuard], component: GraphDirectiveComponent },
    { path: "stocks", canActivate: [AuthGuard], component: StocksComponent },
    { path: "maps", canActivate: [AuthGuard], component: MapsComponent },
    { path: "filter", canActivate: [AuthGuard], component: FilterSearchComponent },
    { path: "adminpanel", canActivate: [AuthGuard], component: AdminComponent },
    // { path: "adminpanel", canActivate: [AdminGuard], component: AdminComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath: "full" --> exact
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
