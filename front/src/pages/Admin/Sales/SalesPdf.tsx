import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { SaleInterface } from "../../../interfaces/SaleInterface";

interface PdfProps {
  sales: SaleInterface[];
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

export const SalesPdf = ({ sales }: PdfProps) => {
  return (
    <Document>
      <Page size={"A4"}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Client</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
          </View>
          {sales.map((sale) => (
            <View style={styles.tableRow} key={sale.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(sale.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(sale.data).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  U${" "}
                  {Number(sale.valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {sale.user.firstName + " " + sale.user.lastName}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {sale.product.name + " - " + sale.product.code}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
