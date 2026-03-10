import { Component, OnInit } from '@angular/core';
import { CharacterServices } from '../../../core/services/CharacterServices';
import { finalize } from 'rxjs';
import { Characters } from '../../../core/models/characters';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit {


  pagenumber: number = 1;
  itsloading: boolean = true;
  characters: Characters | undefined;

  constructor(private characterServices: CharacterServices) { } 


  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() : void {
      this.characterServices
      .getCharacters(this.pagenumber).pipe(
        finalize(() => this.itsloading = false)
      )
      .subscribe
      (
        (response) => {
          this.characters = response;
          this.pagenumber++;

        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      )       

  }
}
