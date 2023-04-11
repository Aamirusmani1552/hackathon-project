import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import React, { FC, ReactElement, useRef, useState } from "react";
import { Player } from "@livepeer/react";
import example from "../../../public/boredApe.png";
import Image from "next/image";
import cyberconnect from "../../../public/Cyberconnect.png";
import useSubscribeProfile from "@/hooks/useSubscribe";
import { getUser } from "@/helpers/helpers";
import { useAddress } from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";

type Props = {};

const PlayVedio: FC<Props> = (props): ReactElement => {
  const address = useAddress();
  const router = useRouter();
  const query = router.query;
  const showRef = useRef(null);
  const subscribeProfile = useSubscribeProfile();

  console.log(query);

  async function handleClick() {
    if (!address) return;
    await subscribeProfile(getUser()?.profileId!);
  }

  return (
    <main className="bg-background min-w-full min-h-screen flex flex-col">
      <Header />
      <section className="px-2 py-1 md:px-8 md:py-2 flex-1 flex flex-col items-center">
        <div className="w-full max-w-[800px] rounded-lg overflow-hidden">
          <Player
            title="ExamplePoster"
            playbackId="f5eese9wwl88k4g8"
            poster={<PosterImage />}
            showPipButton
            objectFit="cover"
            priority
          />
        </div>

        {/* details about vedio */}
        <div className="max-w-[800px] w-full flex gap-2">
          {/* title */}
          <div className="pt-2 flex gap-2 w-full flex-col">
            <p className="text-2xl font-semibold text-darkBlack">
              Title of the vedio
            </p>
            <div>
              <p ref={showRef} className="truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum et nostrum quas ad sed eius rem doloribus
                similique! Deserunt architecto assumenda aut quibusdam amet,
                beatae, facere pariatur iusto impedit animi veritatis, officiis
                quisquam! Officiis explicabo rerum blanditiis ratione? Incidunt
                error quae nulla delectus corrupti cumque aspernatur eaque sit!
                Ratione nulla eius aut doloremque libero et magnam pariatur rem
                quam similique temporibus, culpa ducimus veritatis tenetur
                recusandae suscipit odio voluptatum voluptas nobis. Officiis
                autem cupiditate in assumenda, nemo nam, numquam beatae fuga rem
                magni dolorum aspernatur? Dolores magni soluta, laudantium optio
              </p>
              <span
                className="font-semibold cursor-pointer select-none text-primaryPurple "
                onClick={() => {
                  const p = showRef.current! as HTMLParagraphElement;
                  p.classList.toggle("truncate");
                  console.log(showRef.current);
                  handleClick();
                }}
              >
                show more
              </span>
            </div>

            {/* profile */}
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] rounded-full relative overflow-hidden cursor-pointer">
                <Image
                  src={cyberconnect}
                  alt="video"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="font-semibold cursor-pointer  flex-1">
                <span>aamir_usmani</span>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-primaryPink text-white font-semibold rounded-md cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const PosterImage = () => {
  return (
    <Image
      src={example}
      fill
      style={{
        objectFit: "contain",
      }}
      priority
      placeholder="blur"
      alt="vedio_poster"
    />
  );
};

export default PlayVedio;
