import PopUp from "../../common/popup/PopUp";
import { BsArrowRight } from "react-icons/bs";

export interface ITvShowsPopUp {
  name: string;
  url: string;
}

interface Props {
  data: ITvShowsPopUp;
  status: string;
  onClose: () => void;
}

function TvShowsPopUp({ data, status, onClose }: Props) {
  console.log(data);

  return (
    <PopUp status={status} onClose={onClose}>
      <div className="tv-shows-popup">
        <header className="tv-shows-popup__header">
          <h2>{data.name}</h2>
          <BsArrowRight
            className="tv-shows-popup__back-icon"
            onClick={onClose}
          />
        </header>
        <div className="tv-shows-popup__body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi nobis
          velit quae impedit odit. Ad, accusamus iure? Reprehenderit rem a est
          aperiam et quae consectetur laborum, asperiores officiis veritatis
          neque sunt laudantium obcaecati, commodi dignissimos ducimus quod
          aspernatur nam, laboriosam necessitatibus corporis excepturi?
          Provident, doloribus perspiciatis maxime aliquid autem culpa modi,
          corporis quis veritatis saepe eaque in ex iure numquam expedita?
          Accusamus temporibus necessitatibus recusandae quidem aliquam vitae
          rem quisquam molestias amet voluptatibus odit sint officia tenetur,
          cum, culpa a eos, atque dolore incidunt enim cupiditate molestiae
          ullam iusto. Corporis voluptatem quibusdam perferendis error ipsa
          alias totam fugiat minus est porro molestias in qui culpa,
          voluptatibus voluptate ullam quia aliquam soluta accusamus amet
          blanditiis facere accusantium, nulla iste. Dolorum nobis reprehenderit
          vitae quibusdam vel hic laudantium beatae, quae facere nisi magni? Ut
          nulla ullam nobis cum quasi? Necessitatibus sint accusamus aut
          laudantium? Facilis rerum sint accusantium, vitae molestiae cum,
          veniam fugiat qui voluptas sapiente expedita, nemo recusandae odio.
          Recusandae, explicabo! Veniam doloribus, beatae aliquam ipsa
          consequuntur eos quos voluptatem aut nihil, esse fuga optio neque
          reiciendis error odit non consequatur molestias rerum animi. Impedit
          rerum, similique eum, sint commodi velit expedita inventore corporis,
          eius repudiandae deleniti voluptatem necessitatibus nesciunt. Veniam
          ullam eveniet fugiat quae et perspiciatis rerum rem aut sint
          perferendis, suscipit, corrupti blanditiis voluptate nesciunt. Totam
          sint molestiae numquam, adipisci dolorum omnis ex atque obcaecati
          labore sit repudiandae beatae quam quas dolore est, accusamus saepe
          eligendi ullam non nesciunt. Numquam quibusdam consequatur cum ad sed
          soluta doloremque quas facilis inventore. Quisquam magni libero error,
          consequatur expedita non sint velit placeat debitis iure facere
          temporibus reiciendis eveniet minima commodi dolorum quasi maiores
          porro officia minus fugiat cum vel. At corrupti fugit ea voluptates
          qui sed, nulla nisi voluptatum eius maxime ipsum dicta! At odio,
          veniam consequatur ipsa earum hic dolores, totam sed dolore voluptas,
          culpa quaerat perspiciatis natus non sapiente? Laborum explicabo,
          aliquid suscipit nulla voluptatum optio architecto, necessitatibus
          vitae nesciunt quod perspiciatis ipsum laboriosam facilis! Molestiae
          illum voluptatibus soluta animi adipisci rem omnis. At repellat
          repellendus voluptas praesentium saepe vitae explicabo, obcaecati
          doloremque omnis reiciendis nemo sunt, delectus ipsam. Aspernatur
          distinctio excepturi porro atque dolor? Id esse quae vitae repellendus
          quibusdam perspiciatis, est odit quasi ullam, modi architecto nulla
          labore maiores mollitia harum, nesciunt magni consequatur repellat
          amet cum! Earum sit labore eligendi recusandae qui autem omnis a enim
          culpa perferendis quam voluptatibus cum quos blanditiis doloremque
          beatae animi incidunt ipsam similique officia cupiditate, itaque
          molestias, id tenetur! A cum numquam iste dolor itaque saepe id nulla!
          Quam esse ex, quidem mollitia, culpa quia ducimus nulla officia
          repellendus tenetur enim, sed veniam? Quo laudantium blanditiis ad vel
          eos! Accusantium dolorem nisi sequi deleniti quaerat doloremque
          incidunt, mollitia quo rerum eveniet a dolor non sit eius labore
          consequatur aperiam alias aliquam, sed architecto. Numquam excepturi
          exercitationem aperiam ipsam? Quod nesciunt omnis est eveniet labore
          dicta, ab facilis velit dolor nisi aspernatur debitis officiis
          deserunt soluta impedit. Nostrum iure esse amet ex! Modi aliquam,
          asperiores harum recusandae officia esse molestias! Ducimus.
        </div>
      </div>
    </PopUp>
  );
}

export default TvShowsPopUp;
