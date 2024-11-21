import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule,TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

// know the files and load it
const HttpLoaderFactory= (http:HttpClient) => new TranslateHttpLoader(http, '/i18n/', '.json');

const translateCompilerFactory = ()=> new TranslateMessageFormatCompiler();


const translateLoader:Provider = {
  provide: TranslateLoader,
  useFactory: HttpLoaderFactory,
  deps: [HttpClient]
}

const translateCompiler : Provider = {
  provide: TranslateCompiler,
  useFactory: translateCompilerFactory
}


@NgModule()


export class AppTranslateModule {
  static forRoot():ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
       loader: translateLoader,
       compiler:translateCompiler
    });
  }


  static forChild():ModuleWithProviders<AppTranslateModule> {
    return TranslateModule.forRoot({
       loader: translateLoader,
       compiler:translateCompiler,
       isolate:false
    });
  }


 }
