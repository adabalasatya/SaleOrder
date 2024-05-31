import React, { useState } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const CompletedSales = () => {
  const [selectedSaleOrder, setSelectedSaleOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const salesData = [
    { id: 1, customerName: 'Customer A', price: '$100', lastModified: '2024-05-28' },
    { id: 2, customerName: 'Customer B', price: '$200', lastModified: '2024-05-27' },
    { id: 3, customerName: 'Customer C', price: '$300', lastModified: '2024-05-27' },
    { id: 4, customerName: 'Customer D', price: '$400', lastModified: '2024-05-27' },
    { id: 5, customerName: 'Customer E', price: '$500', lastModified: '2024-05-27' },
  ];

  
  const handleEditView = (saleOrder) => {
    setSelectedSaleOrder(saleOrder);
    setIsModalOpen(true);
  };

  return (
    <Box overflowX="auto">
      <Table variant="striped" borderWidth="1px" borderRadius="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salesData.map((sale) => (
            <Tr key={sale.id}>
              <Td>{sale.id}</Td>
              <Td>{sale.customerName}</Td>
              <Td>{sale.price}</Td>
              <Td>{sale.lastModified}</Td>
              <Td>
                <Button onClick={() => handleEditView(sale)}>Edit/View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sale Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSaleOrder && (
              <Box>
                <p>ID: {selectedSaleOrder.id}</p>
                <p>Customer Name: {selectedSaleOrder.customerName}</p>
                <p>Price: {selectedSaleOrder.price}</p>
                <p>Last Modified: {selectedSaleOrder.lastModified}</p>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CompletedSales;
