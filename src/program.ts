import express from 'express';
import { Startup } from './startUp';

export class Program extends Startup {
  constructor() {
    super(express());

    this.buildConfigurations();
  }

  buildConfigurations() {
    this.useApplicationMiddlewares();

    this.setGlobalRoutesPrefix('/api');

    this.setTestApplicationRoutes();

    this.catchUnknownRoutes(); 
  }

  public Run(): void {
    this.initialize();
  }
}

new Program().Run();