/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContents
// ====================================================

export interface GetContents_contents {
  __typename: "Contents";
  id: string;
  title: string;
}

export interface GetContents {
  contents: (GetContents_contents | null)[] | null;
}
