import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts!: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe((contacts: Contact[]) => this.contacts = contacts);
  }

  goToPage(url: string) {
    window.open(url, "_blank");
  }

}
