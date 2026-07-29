import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { WordsModule } from "./words/words.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WordsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
