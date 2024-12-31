import TableHeader from "@/components/TextForm/TableHeader";
import { Text, View, StyleSheet, FlatList } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: "white",
  },
});

export default function Index() {
  const subscriptionData = {
    success: true,
    data: [
      {
        notes: "",
        _id: "677121131aa769633afc022a",
        member: {
          _id: "6763c172af58289ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
      {
        notes: "",
        _id: "677121131aa769633afc022a1a",
        member: {
          _id: "6763c172af582s89ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
      {
        notes: "",
        _id: "677121131aa7a69633afc0122a",
        member: {
          _id: "6763c172af582s89ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
      {
        notes: "",
        _id: "677121131aa769s6313afc022a",
        member: {
          _id: "6763c172af5a8289ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
      {
        notes: "",
        _id: "677121131aa76196s33afc022a",
        member: {
          _id: "6763c172af582a89ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
      {
        notes: "",
        _id: "677121131aa761a9633afc022a",
        member: {
          _id: "6763c172afs58289ed7645403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "unpaid",
      },
      {
        notes: "",
        _id: "677121131aa769163s3afc022a",
        member: {
          _id: "6763c172af58289ed7645a403",
          fullName: "Updated",
          memberID: "BCSS-000001",
        },
        depositeDate: "2024-12-29T00:00:00.000Z",
        depositeMonth: "March",
        depositeYear: "2024",
        monthlyFee: 80,
        status: "paid",
      },
    ],
  };

  const renderItem = ({ item }) => (
    <View className="flex w-full flex-row justify-between px-4 py-2 border-b border-gray-300">
      <View className="w-[20%]">
        <Text className="text-gray-700">{item.depositeMonth}</Text>
      </View>

      <View className="w-[20%]">
        <Text className="text-gray-700">{item.depositeYear}</Text>
      </View>
      <View className="w-[10%]">
        <Text className="text-gray-700">{item.monthlyFee}</Text>
      </View>
      <View className="w-[20%]">
        <Text
          className={item.status === "paid" ? "text-green-500" : "text-red-500"}
        >
          {item?.status}
        </Text>
      </View>
      <View className="w-[30%]">
        <Text className="text-gray-700">12/12/24</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text className="text-center text-2xl text-sky-500 font-rubik-medium mb-8">
        Monthly Fee Details
      </Text>
      <FlatList
        data={subscriptionData.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View>
            <View className="flex flex-row justify-between px-4 py-2 border-b border-gray-300">
              <View className="w-[20%]">
                <TableHeader text="Month" />
              </View>
              <View className="w-[20%]">
                <TableHeader text="Year" />
              </View>
              <View className="w-[10%]">
                <TableHeader text="Fee" />
              </View>
              <View className="w-[20%]">
                <TableHeader text="Status" />
              </View>
              <View className="w-[30%]">
                <TableHeader text="Deposit Date" />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
