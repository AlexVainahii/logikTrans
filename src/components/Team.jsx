import {
  TeamSection,
  TeamMember,
  TeamMemberName,
  TeamMemberRole,
  TeamMemberImage,
} from "./Team.styled";
import img1 from "../images/team_img_1.jpg";
import img2 from "../images/team_img_2.jpg";
import img3 from "../images/team_img_3.jpg";
import img4 from "../images/team_img_4.jpg";
const Team = () => {
  return (
    <section>
      <TeamSection>
        <TeamMember>
          <TeamMemberImage src={img1} alt="Олександр" />
          <TeamMemberName>Олександр Сидорчук</TeamMemberName>
          <TeamMemberRole>Директор з логістики</TeamMemberRole>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src={img2} alt="Анна" />
          <TeamMemberName>Анна Василенко</TeamMemberName>
          <TeamMemberRole>Менеджер з перевезень</TeamMemberRole>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src={img3} alt="Михайло" />
          <TeamMemberName>Михайло Ковальчук</TeamMemberName>
          <TeamMemberRole>Технічний спеціаліст</TeamMemberRole>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src={img4} alt="Іван" />
          <TeamMemberName>Іван Ткаченко</TeamMemberName>
          <TeamMemberRole>Логістичний аналітик</TeamMemberRole>
        </TeamMember>
      </TeamSection>
    </section>
  );
};
export default Team;
