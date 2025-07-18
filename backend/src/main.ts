import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const PORT = config.get('PORT')
	const ORIGIN: string[] | any = config.get('ORIGIN')

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ORIGIN,
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	await app.listen(PORT)
}
bootstrap()
