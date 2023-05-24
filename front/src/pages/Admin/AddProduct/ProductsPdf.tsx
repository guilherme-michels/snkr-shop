import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Product } from "../../../interfaces/ProductInterface";

interface PdfProps {
  products: Product[];
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

export const ProductsPdf = ({ products }: PdfProps) => {
  return (
    <Document>
      <Page size={"A4"}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Code</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
          </View>
          {products.map((product) => (
            <View style={styles.tableRow} key={product.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.type} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.code}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  U${" "}
                  {Number(product.price).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
