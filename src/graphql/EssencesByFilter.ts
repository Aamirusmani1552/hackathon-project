import { gql } from "@/Types/__generated__";

export const ESSENCES_BY_FILTER = gql(`
  query essencesByFilter($appID: String, $me: AddressEVM!) {
    essenceByFilter(appID: $appID) {
      essenceID
      tokenURI
      
      createdBy {
        avatar
        handle
        profileID
        metadata
        owner{
          address
        }
      }
      collectMw {
        contractAddress
        type
      }
      isCollectedByMe(me: $me)
    }
  }
`);
