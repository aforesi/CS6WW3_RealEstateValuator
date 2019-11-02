import { Component } from "@angular/core";
import { InputFormComponent } from "./input-form/input-form.component";
import { ResultsComponent } from "./results/results.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "test-app";
}
