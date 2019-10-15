import './App.css';
import React, { Component } from 'react';
import { Container, Row, Col,Form, Button} from 'react-bootstrap';
import { CountryComponent } from './list';
import { Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { countryList } from './country_list';

export default class Main extends Component<{}, any> {
  
    constructor(props:any) {
        super(props);

        this.state = {
            selectedCountry: "",
            selectedDays: "",
            countrycode : "",
            cities: [],
            accordionDescription:[],
            setOfDistinctCities : new Set()
        };
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);   
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

   setCountryCode(code:string): string{
       let name = "";
        switch (code) {
            case "POLAND":
                name = "PL";
                break;
            case "GERMANY":
                name = "DE";
                break;
            case "SPAIN":
                name = "ES";
                break;
            case "FRANCE":
                name = "FR";
                break;
        }
       return name;
    }

    
    handleClick(): void {
        this.getMostPolutedCities();
    }

    handleCountryChange(name: any): void{
        console.log("name " + name);
        let code:string = this.setCountryCode(String(name).toUpperCase());
        this.setState({
            selectedCountry: name.target,
            countrycode: code 
        });
    }
    handleNumberChange(quantity:any): void {
        this.setState({
            selectedDays: quantity.target.value
        });
    }

    handleClear(): void {
        this.setState({
            selectedCountry: "",
            selectedDays: "",
            countrycode: "",
            cities: [],
            accordionDescription: [],
            setOfDistinctCities: new Set()
        });
    }

 createCustomDate = (param: string): string => {
    const nrOfLastDaysToMillis = parseInt(param,10) * 24 * 60 * 60 * 1000;
    const finalDate = new Date(Date.now() - nrOfLastDaysToMillis);
    const checkDay = finalDate.getDate().toString().length === 2 ? finalDate.getDate() : '0' + finalDate.getDate();
    return finalDate.getFullYear() + '-' + (finalDate.getMonth() + 1) + '-' + checkDay;
}
    async getMostPolutedCities() {
      fetch('https://api.openaq.org/v1/measurements?country=' + encodeURIComponent(this.state.countrycode) + '&date_from=' + encodeURIComponent(this.createCustomDate(this.state.selectedDays)) + '&order_by[]=value&sort=desc')
          .then(data => data.json())
          .then(data => {
              let tempSet = new Set();
              let resultObj = data.results;
              Array.from(resultObj)
                  .forEach((item: any) => {
                      return tempSet.add(item.city)
                    }
                  )
              const dat = Array.from(tempSet)
                  .slice(0, 10)
              return dat;
          }).then(async data => {
                  let tempArray: any = [];
                  data.forEach(item => {
                      tempArray.push(item);
                  }
                  )
                  await this.setState({ cities: tempArray }, ()=> this.createList());
              }
      )
}

   createList() {  
      this.state.cities.forEach( (item: string) => {
          let val: any = item;
         fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURIComponent(item) + '&format=json&limit=1&origin=*')
              .then(data => data.json())
              .then((data) => {
                  let tempObj: any = {};              
                  tempObj[val] = data[2].join("") === "" ? " Description not available" : data[2];
                  this.setState((prev:any) =>({ accordionDescription:[
                      ...prev.accordionDescription,tempObj]
                  }));

              })      
      });
    }
    returnAllValues() {
       
    }

    render() {
    return(
        <>
            <Container className="imageContainer">

                    <Form className="searchForm">
                <Row>
                        <Col xs={6} sm={6} md={{ span: 4, offset: 2 }}>                  
                            <Typeahead {...this.state} id="inp" onChange={this.handleCountryChange} options={countryList} placeholder="Country" />
                        </Col>
                        <Col xs={6} sm={6} md={{ span: 4}}>
                            <Form.Control type="text" className="justify-content-center" onChange={this.handleNumberChange} value={this.state.selectedDays} placeholder="nr of days" />
                    </Col>
                  
                </Row>
                 <Row>
                        <Col md={{span:8, offset:2}} lg={{ span: 5, offset: 4 }}>
                            <Button variant="success" className="btn1" onClick={this.handleClick}>Search</Button>
                            <Button variant="danger" className="" onClick={this.handleClear}>Clear</Button>
                        </Col>                
          
                </Row>
            </Form>

            </Container>

            <div className="resultContainer">
                <ul className="resultList">
                    { this.state.accordionDescription.map((item:any) => 
                        (<CountryComponent key={Object.keys(item)+"id"} name={Object.keys(item)} value={Object.values(item)} />)
                    )}
                </ul>
            </div>
    </>
);
}
}
