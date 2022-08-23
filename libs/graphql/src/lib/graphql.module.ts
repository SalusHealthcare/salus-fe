import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export function createApollo(httpLink: HttpLink) {
  const uri = 'https://salus-be.herokuapp.com/graphql';

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      };
    }
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  imports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  exports: [ApolloModule, HttpClientModule],
})
export class GraphqlModule {}
