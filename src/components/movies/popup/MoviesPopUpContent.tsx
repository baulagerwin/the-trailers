import { VscChromeClose } from "react-icons/vsc";

interface Prop {
  onClose: () => void;
}

function MoviesPopUpContent({ onClose }: Prop) {
  return (
    <div className="movies-popup">
      <VscChromeClose className="movies-popup__close" onClick={onClose} />
      <div className="movies-popup__header">
        {/* <MdKeyboardBackspace className="movies-popup__back" onClick={onClose} /> */}
        <h2>Animation</h2>
      </div>
      <div className="movies-popup__body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quis
        labore eum aperiam similique corporis doloribus excepturi itaque qui
        obcaecati consequuntur id vero sunt, minima, odit a libero laudantium
        ut, sit iusto in ea. Fugiat ab quibusdam doloremque vitae ratione dolor,
        nobis excepturi consequuntur? Accusantium ratione voluptas tempora
        accusamus ipsa possimus, sapiente iure voluptatibus eum id aliquid
        veritatis sunt, quas ea iusto provident rem aperiam voluptatum enim
        ullam? Quo perferendis quasi eos deserunt atque incidunt nostrum minus
        magnam repudiandae odio ipsa quaerat reiciendis consequatur repellat
        tempora iusto id rem, maiores necessitatibus temporibus! Quo aut magni
        consequatur possimus, necessitatibus vitae alias, doloribus deleniti
        enim iste quasi nisi temporibus fuga facilis quaerat error quae! Ad eius
        sit cupiditate similique excepturi nam natus sequi, soluta, optio
        consequuntur mollitia? Ducimus, ab? Sapiente possimus voluptate, quidem
        distinctio aut eligendi? Odio sunt reprehenderit quis sed. Eum et optio
        expedita. Temporibus magnam aut quis hic commodi facilis reprehenderit
        ex provident consequuntur recusandae cupiditate, perspiciatis vel iusto.
        Vitae voluptatem optio quam iure quidem mollitia asperiores quia,
        quibusdam ex delectus culpa reprehenderit soluta cupiditate molestiae
        ducimus modi ipsa? Placeat fuga eum ipsum ea repellat quis ullam dolores
        architecto. Deleniti nobis praesentium totam ea quidem sed perferendis!
        Consequatur illo quas deserunt voluptates, vel soluta sequi delectus
        eaque cumque nemo corrupti earum tenetur fuga officia aut sint esse
        placeat. Necessitatibus incidunt, cupiditate blanditiis dolorum sapiente
        consequuntur doloremque ad pariatur dolores placeat quis, deleniti
        fugiat tenetur corrupti a maiores praesentium inventore recusandae
        corporis sit itaque? Omnis, excepturi nisi. Aspernatur asperiores
        deleniti eaque quaerat. Unde vero libero pariatur reiciendis blanditiis
        sapiente ipsa, harum dignissimos ab laboriosam suscipit a voluptatum
        nihil aperiam, delectus alias sequi corporis illo magnam rem inventore
        nemo. Recusandae nostrum atque adipisci magni. Dignissimos explicabo
        distinctio, labore repellat suscipit aspernatur asperiores. Numquam
        dolore minima nemo suscipit cupiditate magni quisquam excepturi
        provident voluptatem, maxime incidunt rem cumque doloremque possimus,
        quaerat natus mollitia eveniet temporibus, nesciunt iste ullam non harum
        officiis nihil? A, totam minima. Voluptatibus, repellendus ratione,
        dolorem neque minima et eveniet vel debitis quam eius aspernatur
        consectetur voluptas eos aperiam corporis ducimus veniam soluta fuga.
        Perspiciatis assumenda, incidunt hic natus, saepe quas porro rem eaque
        quis libero ex iusto illo magni nulla! Corporis odio in assumenda ipsam
        doloremque enim asperiores excepturi, rem eaque quae quo ex quidem
        nobis, aperiam aliquam? Officia, error dignissimos. Esse officiis at
        aperiam ipsa, tempora accusantium doloremque iure cum, dolorem ipsum
        dolorum voluptate exercitationem fugit iusto? Autem dolore commodi ex,
        esse delectus exercitationem iste debitis praesentium culpa fugiat
        eveniet sint ea consequatur sed et cupiditate sapiente ratione quaerat?
        Optio libero obcaecati maxime saepe, corrupti dolorem unde odio at neque
        quo qui, ipsum, nostrum aspernatur quam fugit. Id eveniet in cumque amet
        quaerat assumenda odit culpa nostrum molestiae nulla aliquid earum
        voluptatibus quidem possimus fuga doloribus quam ipsam ducimus optio
        asperiores consequuntur a modi, minima eum! Est iure, facilis dolore
        tenetur rerum nihil amet repudiandae inventore veniam officia iusto quo
        impedit consequuntur. Voluptatem assumenda voluptatum error dolorum iste
        doloribus odio facere voluptates rem, maiores cupiditate consequuntur?
        Optio, deserunt.
      </div>
    </div>
  );
}

export default MoviesPopUpContent;
