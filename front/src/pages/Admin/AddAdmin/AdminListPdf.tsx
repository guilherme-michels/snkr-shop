import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Product } from "../../../interfaces/ProductInterface";
import { Person } from "../../../interfaces/PersonInterface";

interface PdfProps {
  users: Person[];
}

const styles = StyleSheet.create({
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

export const AdminsPdf = ({ users }: PdfProps) => {
  return (
    <Document>
      <Page size={"A4"}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>First Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Last Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Email</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Position</Text>
            </View>
          </View>
          {users.map((user) => (
            <View style={styles.tableRow} key={user.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.firstName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.lastName} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{user.position}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
