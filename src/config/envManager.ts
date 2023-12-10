import 'dotenv/config';
import fs from 'fs';
import path from 'path';

export class EnvManager {
 /*    private env:  { [k: string]: string | undefined }

    constructor(env:  { [k: string]: string | undefined }) {
        this.env = env;
    } 
    const greet: string = 'hello'
*/
 constructor(private env: { [k: string]: string | undefined }) { }

  private expectedEnvValues(): string[] {
    const program = ['APP_ENV', 'APP_PORT'];
    return program;
  }
  public writeEnvFile() {
   const fileExist =  fs.existsSync(path.resolve(__dirname, '../../.env'));
   if (!fileExist) {
       fs.writeFileSync(
           path.resolve(__dirname, '../../.env'),
           '.env'
       )
   }
   return new EnvManager(process.env);
  }
  public getEnvValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]!;
    if (!value && throwOnMissing) {
      throw new Error(`\tmissing env.${key}.\n \n\tPlease add ${key} in .env file\n`);
    }

    return value;
  }

  public getApplicationPort() {
    return parseInt(this.getEnvValue('APP_PORT'), 10);
  }
  
  public ensureEnvValues() {
    this.expectedEnvValues().forEach(k => this.getEnvValue(k, true));
    return new EnvManager(process.env);
  }

  public isProduction() {
    const mode = this.getEnvValue('APP_ENV', false);
    return mode != 'development';
  }
}

const envManager = new EnvManager(process.env).writeEnvFile()
  .ensureEnvValues();

export { envManager };