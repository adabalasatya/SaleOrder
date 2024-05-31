import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Alert, AlertIcon, VStack,  useColorMode } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const products = [
  { value: 1, label: 'Product 1' },
  { value: 2, label: 'Product 2' },
  { value: 3, label: 'Product 3' },
  { value: 4, label: 'Product 4' },
  { value: 5, label: 'Product 5' },
];

const SaleOrderForm = ({ onClose, onSubmitSuccess }) => {
  const { control, handleSubmit } = useForm();
  const [isOrderSaved, setOrderSaved] = useState(false);

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
    setOrderSaved(true);
    onSubmitSuccess(data); // Pass the new sale data to the parent component
  };

  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === 'dark';

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? 'gray.700' : 'inherit',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkMode ? 'gray.400' : 'inherit',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? 'gray.700' : 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#718096' : 'white',
      color: isDarkMode ? 'white' : 'black', 
      '&:hover': {
        backgroundColor: isDarkMode ? '#1A202C' : '#E2E8F0', 
      },
    }),
  };


  return (
    <Modal isOpen onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!isOrderSaved ? (
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              p={6}
              boxShadow="md"
              bg="white ? dark"
            >
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Customer Name</FormLabel>
                  <Controller
                    name="customerName"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Enter customer name" />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Invoice Date</FormLabel>
                  <Controller
                    name="invoiceDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        placeholderText="Select Date"
                        onChange={field.onChange}
                        className="chakra-input"

                        customInput={
                          <Input
                            {...field}
                            placeholder="Select Date"
                            _placeholder={{ color: isDarkMode ? 'gray.400' : 'inherit' }}
                            backgroundColor={isDarkMode ? 'gray.700' : 'inherit'}
                          />
                        }

                      />
                    )}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl >
                  <FormLabel>Products</FormLabel>
                  <Controller
                    name="products"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={products}
                        isMulti
                        styles={customStyles}
                        classNamePrefix="chakra-react-select"
                        placeholder="Select products"

                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sell Price</FormLabel>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder="Enter sell price" />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Item Quantity</FormLabel>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder="Enter item quantity" />}
                    rules={{ required: true }}
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue" width="full">
                  Save
                </Button>
              </VStack>
            </Box>
          ) : (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="100px"
              mt={4}
              borderRadius="md"
              boxShadow="lg"
              bg="green.50"
              color="green.700"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <Box>
                <strong>Success!</strong> <br />
                Order saved successfully!
              </Box>
            </Alert>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;