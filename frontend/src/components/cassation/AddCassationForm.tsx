//Skarga kasacyjna z pomoca ChatGPT :)
import React from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddCassationForm = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Miejscowość" name="location">
        <Input placeholder="Wpisz miejscowość" />
      </Form.Item>

      <Form.Item label="Data" name="date" rules={[{ required: true, message: 'Wybierz datę!' }]}>
        <DatePicker defaultValue={moment()} format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item label="Sąd" name="court" rules={[{ required: true, message: 'Wybierz sąd!' }]}>
        <Select placeholder="Wybierz sąd">
          <Option value="warszawa">Warszawie</Option>
          <Option value="krakow">Krakowie</Option>
          <Option value="poznan">Poznaniu</Option>
          {/* Możesz dodać inne opcje */}
        </Select>
      </Form.Item>

      <Form.Item label="Skarżący" name="complainant" rules={[{ required: true, message: 'Wpisz nazwisko skarżącego!' }]}>
        <Input placeholder="Wpisz skarżącego" />
      </Form.Item>

      <Form.Item label="Reprezentowani przez" name="attorney">
        <Select placeholder="Wybierz pełnomocnika">
          <Option value="adwokat">Adwokata</Option>
          <Option value="radca">Radcę prawnego</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Organ" name="govbody" rules={[{ required: true, message: 'Wpisz nazwę organu!' }]}>
        <Input placeholder="Wpisz nazwę organu" />
      </Form.Item>

      <Form.Item label="Sygnatura akt" name="sygnature" rules={[{ required: true, message: 'Wpisz sygnaturę akt!' }]}>
        <Input placeholder="Wpisz sygnaturę akt" />
      </Form.Item>

      <Form.Item label="Wartość przedmiotu zaskarżenia" name="value" rules={[{ required: true, message: 'Wpisz wartość przedmiotu!' }]}>
        <InputNumber placeholder="Wpisz wartość" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Wpis" name="entryValue" rules={[{ required: true, message: 'Wpisz wysokość wpisu!' }]}>
        <InputNumber placeholder="Wpisz wysokość wpisu" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Rozporządzenie Rady Ministrów" name="ordinance" rules={[{ required: true, message: 'Wpisz numer rozporządzenia!' }]}>
        <Input placeholder="Wpisz rozporządzenie Rady Ministrów z dnia" />
      </Form.Item>

      <Form.Item label="Wyrok z dnia" name="sentenceDate" rules={[{ required: true, message: 'Wybierz datę wyroku!' }]}>
        <DatePicker defaultValue={moment()} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Sygn. akt wyroku" name="sygnatureSentence">
        <Input placeholder="Wpisz sygnaturę wyroku" />
      </Form.Item>

      <Form.Item label="Zarzuty wobec wyroku" name="plea">
        <Input.TextArea placeholder="Wpisz zarzuty" rows={4} />
      </Form.Item>

      <Form.Item label="Prośba o uchwałę" name="resolution">
        <Input.TextArea placeholder="Wpisz prośbę" rows={4} />
      </Form.Item>

      <Form.Item label="Uzasadnienie" name="justification">
        <Input.TextArea placeholder="Wpisz uzasadnienie" rows={6} />
      </Form.Item>

      <Form.Item label="Załączniki" name="attachments">
        <Input.TextArea placeholder="Wpisz załączniki" rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Złoż Skargę
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCassationForm;
