import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useColorMode } from '@chakra-ui/react';

const ActiveSales = ({ data }) => {
  const [salesData, setSalesData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  const updateSalesData = (updatedSale) => {
    const updatedSales = salesData.map(sale =>
      sale.id === updatedSale.id ? updatedSale : sale
    );
    setSalesData(updatedSales);
  };

  const onSubmit = (data) => {
    data.lastModified = new Date().toISOString(); 
    updateSalesData(data);
    setIsModalOpen(false);
  };

  const handleEditView = (sale) => {
    setSelectedSale(sale);
    reset(sale);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setSalesData(data);
    } else {
      console.error("Provided data is not an array");
    }
  }, [data]);


  const { colorMode } = useColorMode();

  return (
    <Box overflowX="auto">
      <Table variant="striped" borderWidth="1px" borderRadius="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th> 
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(salesData) && salesData.map((sale) => (
            <Tr key={sale.id}>
              <Td>{sale.id}</Td>
              <Td>{sale.customerName}</Td>
              <Td>{sale.price}</Td>
              <Td>{sale.quantity}</Td> 
              <Td>{sale.lastModified}</Td> 
              <Td>
              <Button onClick={() => handleEditView(sale)} backgroundColor={colorMode === 'light' ? 'gray.200' : undefined}  _hover={{ backgroundColor: colorMode === 'light' ? 'gray.300' : undefined }}>Edit/View</Button>

              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Sale Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSale && (
              <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <FormLabel>ID</FormLabel>
                  <Controller
                    name="id"
                    control={control}
                    defaultValue={selectedSale.id}
                    render={({ field }) => <Input {...field} isReadOnly />}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Customer Name</FormLabel>
                  <Controller
                    name="customerName"
                    control={control}
                    defaultValue={selectedSale.customerName}
                    render={({ field }) => <Input {...field} />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue={selectedSale.price}
                    render={({ field }) => <Input {...field} />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Quantity</FormLabel>
                  <Controller
                    name="quantity"
                    control={control}
                    defaultValue={selectedSale.quantity}
                    render={({ field }) => <Input {...field} />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last Modified</FormLabel>
                  <Controller
                    name="lastModified"
                    control={control}
                    defaultValue={selectedSale.lastModified}
                    render={({ field }) => <Input {...field} isReadOnly />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4}>Save</Button>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveSales;
