import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
  query Effects($take: String, $skip: String) {
    effects(Take: $take, Skip: $skip) {
      id
      sku
      name
      productTitle
      thumbPath
      modelPath
      size
      color
      price
    }
  }
`;

export const FETCH_EFFECT = gql`
  query FetchEffect($sku: String, $oldParam: String) {
    fetchEffect(sku: $sku, oldParam: $oldParam) {
      id
      modelPath
      sku
      name
      thumbPath
      productTitle
      price
      size
      Renderer {
        hdrSrc
        shadow
        msaa
        toneMapping
      }
      occluderSrc
    }
  }
`;

export const SEND_STATISTICS = gql`
  mutation AddStatisticsClicks(
    $visitorsIp: String
    $sku: String
    $country: String
    $browser: String
    $os: String
    $type: String
  ) {
    addStatisticsClicks(
      visitorsIP: $visitorsIp
      sku: $sku
      country: $country
      browser: $browser
      os: $os
      type: $type
    ) {
      isSuccess
      statusText
    }
  }
`;
