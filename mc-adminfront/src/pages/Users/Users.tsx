import { Container } from "@mui/material";
import Banner from "components/templates/Banner";
import UsersList from "./UsersList";

export default function Users() {
  return (
    <div>
      <Container maxWidth="lg">
        <Banner heading="Users"></Banner>
        <UsersList />
      </Container>
    </div>
  );
}
