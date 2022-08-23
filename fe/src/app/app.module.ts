import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { DiscountComponent } from './components/home-area/discount/discount.component';
import { SpecialsComponent } from './components/home-area/specials/specials.component';
import { DessertsComponent } from './components/home-area/desserts/desserts.component';
import { SalesComponent } from './components/home-area/sales/sales.component';
import { SloganComponent } from './components/home-area/slogan/slogan.component';
import { RecommendedComponent } from './components/home-area/recommended/recommended.component';
import { SearchComponent } from './components/home-area/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingComponent } from './components/home-area/pricing/pricing.component';
import { ClockComponent } from './components/home-area/clock/clock.component';
import { InventoryComponent } from './components/home-area/inventory/inventory.component';
import ArrayService from './services/array.service';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { ContactUsComponent } from './components/contact-us-area/contact-us/contact-us.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { PleaseWaitComponent } from './components/shared-area/please-wait/please-wait.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelAComponent } from './components/home-area/panel-a/panel-a.component';
import { PanelBComponent } from './components/home-area/panel-b/panel-b.component';
import { PanelCComponent } from './components/home-area/panel-c/panel-c.component';
import { AdminLayoutComponent } from './components/admin-area/admin-layout/admin-layout.component';
import { ProductsCardAdminComponent } from './components/products-area/products-card-admin/products-card-admin.component';
import { GraphComponent } from './components/admin-area/graph/graph.component';
import { BarComponent } from './components/admin-area/graphs/bar/bar.component';
import { PieComponent } from './components/admin-area/graphs/pie/pie.component';
import { StocksComponent } from './components/admin-area/stocks/stocks.component';
import { MapsComponent } from './components/admin-area/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { FilterSearchComponent } from './components/admin-area/filter-search/filter-search.component';
import { HighlightDirective } from './directives/highlight.directive';
import { BarDirectiveComponent } from './components/admin-area/graphs/bar-directive/bar-directive.component';
import { GraphDirectiveComponent } from './components/admin-area/graph-directive/graph-directive.component';



@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        LogoComponent,
        HomeComponent,
        DiscountComponent,
        SpecialsComponent,
        DessertsComponent,
        SalesComponent,
        SloganComponent,
        RecommendedComponent,
        SearchComponent,
        PricingComponent,
        ClockComponent,
        InventoryComponent,
        ProductListComponent,
        AboutComponent,
        ContactUsComponent,
        Page404Component,
        ProductCardComponent,
        ProductDetailsComponent,
        AddProductComponent,
        PleaseWaitComponent,
        UpdateProductComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent,
        AdminComponent,
        PanelAComponent,
        PanelBComponent,
        PanelCComponent,
        AdminLayoutComponent,
        ProductsCardAdminComponent,
        GraphComponent,
        BarComponent,
        PieComponent,
        StocksComponent,
        MapsComponent,
        FilterSearchComponent,
        HighlightDirective,
        BarDirectiveComponent,
        GraphDirectiveComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgbModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'
            apiKey: ''
        })
    ],

    // Tell Angular to create a DI object from ArrayService for the entire app: 
    // providers: [ArrayService],

    // Register the interceptor so any request will invoke it: 
    providers: [{
        provide: HTTP_INTERCEPTORS, // Register the interceptor
        useClass: JwtInterceptor, // Our interceptor class
        multi: true // Can register it several times if needed
    }],

    bootstrap: [LayoutComponent]
})
export class AppModule { }
