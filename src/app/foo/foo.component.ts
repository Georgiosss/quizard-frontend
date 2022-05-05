import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Foo } from './foo';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {
  private _url = "http://backendfoobar-env.eba-csyhpyy3.eu-central-1.elasticbeanstalk.com/foo";
  public foo: Foo;

  constructor(private http: HttpClient) { 
    this.foo = new Foo();
  }

  ngOnInit(): void {
    this.getFoo();
  }

  getFoo() {
    this.http.get<Foo>(this._url).subscribe(data => this.foo = data);
  }

}
