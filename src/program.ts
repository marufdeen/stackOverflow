import express from 'express';
import { Startup } from './startUp';

export class Program extends Startup {
  constructor() {
    super(express());

    this.buildConfigurations();
    this.Run()
  }

  private buildConfigurations() {
    
    this.useApplicationMiddlewares();

    this.setGlobalRoutesPrefix('/api');

    this.setTestApplicationRoutes();

    this.catchUnknownRoutes(); 
  }

  private Run(): void {
    this.initialize();
  }
}

new Program()