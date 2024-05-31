import React, { useState } from 'react';
import { Box, Button, Flex, Heading, useColorMode } from '@chakra-ui/react';
import ActiveSales from './ActiveSales';
import CompletedSales from './CompletedSales';
import SaleOrderForm from './SaleOrderForm';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSaleOrderFormOpen, setSaleOrderFormOpen] = useState(false);
  const [salesData, setSalesData] = useState([]); 
  const [nextId, setNextId] = useState(1); 

  const toggleSaleOrderForm = () => {
    setSaleOrderFormOpen(!isSaleOrderFormOpen);
  };

  const handleNewSale = (newSale) => {
    const modifiedSale = {
      ...newSale,
      id: nextId, 
      lastModified: new Date().toISOString() 
    };
    setSalesData([...salesData, modifiedSale]);
    setNextId(nextId + 1); 
    setSaleOrderFormOpen(false);
  };

  return (
    <Box p={[2, 4]}>
      <Flex justifyContent="space-between" alignItems="center" mb={[2, 4]}>
        <Heading fontSize={["lg", "2xl"]}>Sales Orders</Heading>
        <Button size="sm" onClick={toggleColorMode}>
          Switch to {colorMode === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      <Flex mb={[2, 4]} direction={["column", "row"]}>
        <Button 
          mr={[0, 2]} 
          mb={[2, 0]} 
          size="sm" 
          onClick={() => setActiveTab('active')} 
          isActive={activeTab === 'active'}
        >
          Active Sales Orders
        </Button>
        <Button 
          size="sm" 
          onClick={() => setActiveTab('completed')} 
          isActive={activeTab === 'completed'}
        >
          Completed Sales Orders
        </Button>
        <Button 
          ml={[0, "auto"]} 
          mt={[2, 0]} 
          size="sm" 
          onClick={toggleSaleOrderForm}
        >
          + Sale Order
        </Button>
      </Flex>

      {activeTab === 'active' ? (
        <ActiveSales data={salesData} />
      ) : (
        <CompletedSales data={salesData} />
      )}
      {isSaleOrderFormOpen && (
        <SaleOrderForm onClose={toggleSaleOrderForm} onSubmitSuccess={handleNewSale} />
      )}
    </Box>
  );
};

export default HomePage;
