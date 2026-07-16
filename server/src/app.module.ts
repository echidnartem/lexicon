import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { WordsService } from './words/words.service';

@Module({
  controllers: [AppController],
  providers: [WordsService],
})
export class AppModule {}
