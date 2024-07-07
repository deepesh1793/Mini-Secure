import { card,blockstore } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Our Technology, <br className="sm:block hidden" /> Your Advantage
      
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Utilizing blockchain and IPFS technology, we ensure tamper-proof evidence storage and efficient retrieval. This combination guarantees data security and accessibility while maintaining confidentiality.
      </p>

      {/* <Button styles={`mt-10`} /> */}
    </div>
  {/* add image here */}
    {/* <div className={layout.sectionImg}>
      <img src={blockstore} alt="billing" className="w-[100%] h-[100%]" />
    </div> */}
  </section>
);

export default CardDeal;
