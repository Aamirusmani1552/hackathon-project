import EssenceCard from "@/components/EssenceCard/EssenceCard";
import Header from "@/components/Header/Header";
import { PRIMARY_PROFILE } from "@/graphql/PrimaryProfile";
import { PRIMARY_PROFILE_ESSENCES } from "@/graphql/PrimaryProfileEssences";
import { getAccessToken } from "@/helpers/helpers";
import { Essence, Profile } from "@/Types/__generated__/graphql";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { parseIPFSUrl } from "../../helpers/helpers";
import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect, useState } from "react";
import cyberconnectImage from "../../../public/Cyberconnect.png";
import Image from "next/image";
import VideoComponent from "@/components/VideoComponent";
import { RiVideoUploadLine } from "react-icons/ri";
import { ImSpinner8 } from "react-icons/im";
import { GET_ESSENECE } from "@/graphql/GetEssences";

enum Tabs {
  POSTS = "POSTS",
  TUTORIALS = "TUTORIALS",
}

type Props = {};

const styles = {
  activeTab:
    "bg-primaryYellow px-2 py-1 text-white rounded-md cursor-pointe cursor-pointer",
  inActiveTab: " px-2 py-1 rounded-md cursor-pointer  text-darkBlack",
};

const ViewProfile: FC<Props> = (props): ReactElement => {
  const router = useRouter();
  const { address, handle } = router.query;
  const token = getAccessToken();
  const [profile, setProfile] = useState<Profile>();
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.POSTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [video, setVideo] = useState<File | undefined>();

  // query for primary profiles
  const { data } = useQuery(PRIMARY_PROFILE_ESSENCES, {
    variables: {
      address: address,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: vedioData } = useQuery(GET_ESSENECE, {
    variables: {
      appID: "example_1552" + address,
      handle: handle as string,
    },
  });

  const { data: profileData } = useQuery(PRIMARY_PROFILE, {
    variables: {
      address: address,
    },
  });

  const metadataURI = profileData?.address?.wallet?.primaryProfile?.metadata;

  console.log("This is vedio data", vedioData);
  console.log(address, handle);

  useEffect(() => {
    if (!profileData) return;

    async function getProfileMetadata() {
      if (!metadataURI) return;
      const metadata = await axios.get(parseIPFSUrl(metadataURI)!);

      setProfile(metadata.data);
    }

    getProfileMetadata();
  }, [metadataURI]);

  useEffect(() => {
    openModal
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "visible");
  }, [openModal]);

  return (
    <main className="bg-background min-w-full min-h-screen">
      <Header />
      <section className="px-2 py-1 md:px-8 md:py-2 flex gap-4 flex-col flex-1">
        {/* profile details */}
        <div className="flex items-center gap-4 text-2xl font-semibold mb-8 mt-4">
          <div className="w-14 h-14 relative rounded-full overflow-hidden">
            <Image
              src={profile?.avatar ? profile.avatar : cyberconnectImage}
              alt={"profileImage"}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <span>{profile?.handle}</span>
            <button className="font-semibold px-2 py-1 w-fit md:hidden text-xs bg-primaryPink rounded-md text-white">
              Subscribe
            </button>
          </div>

          {/* subscribe button */}
          <button className="font-semibold hidden md:block px-4 py-2 text-base bg-primaryPink rounded-md text-white">
            Subscribe
          </button>
        </div>

        {/* navigation */}
        <ul className="flex gap-4 text-xl font-semibold text-darkBlack items-center px-2 py-1 md:px-4 md:py-2 rounded-md  mb-2">
          <li
            className={
              activeTab === Tabs.POSTS ? styles.activeTab : styles.inActiveTab
            }
            onClick={() => {
              activeTab === Tabs.TUTORIALS && setActiveTab(Tabs.POSTS);
            }}
          >
            Posts
          </li>
          <li
            className={
              activeTab === Tabs.TUTORIALS
                ? styles.activeTab
                : styles.inActiveTab
            }
            onClick={() => {
              activeTab === Tabs.POSTS && setActiveTab(Tabs.TUTORIALS);
            }}
          >
            Tutorials
          </li>

          {activeTab === Tabs.TUTORIALS && (
            <li className="flex-1 flex justify-end">
              <button
                className="text-white flex items-center gap-2 bg-primaryGreen px-4 py-2 text-sm font-semibold rounded-md"
                onClick={() => {
                  setIsLoading(true);
                  setOpenModal(true);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);
                }}
              >
                <span className={isLoading ? "animate-spin" : ""}>
                  {!isLoading ? <RiVideoUploadLine /> : <ImSpinner8 />}
                </span>
                <span className="hidden sm:block">Upload New</span>
              </button>
            </li>
          )}
        </ul>

        {activeTab === Tabs.POSTS ? (
          <div className="custom-grid">
            {data?.address?.wallet?.primaryProfile?.essences?.edges?.map(
              (item) => {
                return (
                  <EssenceCard
                    key={item?.node?.essenceID}
                    data={item?.node as Essence}
                  />
                );
              }
            )}
          </div>
        ) : (
          <div className="custom-grid">
            <VideoComponent />
            <VideoComponent />
            <VideoComponent />
            <VideoComponent />
            <VideoComponent />
          </div>
        )}
      </section>
    </main>
  );
};

export default ViewProfile;
