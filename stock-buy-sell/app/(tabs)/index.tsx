import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Stock {
  stock: string;
  value: number;
}

export default function TabOneScreen() {
  const [randomNumbers, setRandomNumbers] = useState<number[]>(generateUniqueNumbers(10, 4));
  const [cart, setCart] = useState<Stock[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomNumbers(generateUniqueNumbers(10, 4));
    }, 700);

    return () => clearInterval(intervalId);
  }, []);

  function generateUniqueNumbers(maxVal: number, count: number): number[] {
    const numbers: number[] = [];

    while (numbers.length < count) {
      const number = Math.floor(Math.random() * maxVal) + 1;
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    return numbers;
  }

  const addToCart = (stock: string, value: number) => {
    const updatedCart: Stock[] = [...cart, { stock, value }];
    setCart(updatedCart);
    setTotalValue(calculateTotalValue(updatedCart));
    console.log(`Added Stock ${stock} to Cart at Value: ${value}`);
  };

  const removeFromCart = (stock: string, value: number) => {
    const updatedCart: Stock[] = cart.filter(item => item.stock !== stock);
    setCart(updatedCart);
    setTotalValue(calculateTotalValue(updatedCart));
    console.log(`Removed Stock ${stock} from Cart`);
  };

  const calculateTotalValue = (updatedCart: Stock[]): number => {
    return updatedCart.reduce((total, item) => total + item.value, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Live Market Dashboard</Text>
        {randomNumbers.map((value, index) => (
          <View key={index} style={styles.stockBox}>
            <Text>{`Stock ${String.fromCharCode(65 + index)}: ${value}`}</Text>
            <Button title="Buy" onPress={() => addToCart(String.fromCharCode(65 + index), value)} />
          </View>
        ))}
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>🛒 Cart</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text>{`Stock ${item.stock}: ${item.value}`}</Text>
              <Button title="Sell" onPress={() => removeFromCart(item.stock, item.value)} />
            </View>
          ))}
          <Text style={styles.totalText}>{`Total Value: ${totalValue}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    padding: 10,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center align the text
  },
  stockBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartContainer: {
    marginTop: 20,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
