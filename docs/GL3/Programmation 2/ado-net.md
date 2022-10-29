# ADO.NET

**ADO** Stands for : **A**ctiveX **D**ata **O**bject

    It is a module of .Net Framework which is used to establish connection between application and data sources.
  
  ADO.NET has two main components that are used for accessing and manipulating data are:
  
  | Data provider                                                                    | DataSet                                                                                                                                                                                |
  | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | It is used to connect to the database, execute commands and retrieve the record. | It is a collection of data tables that contain the data. It is used to fetch data without interacting with a Data Source that's why, it also known as disconnected data access method. |

## Connected Mode

``SqlConnection`` : It is used to establish a connection to a specific data source

 ``SqlCommand`` : It is used to execute queries to perform database operations

 ``SqlDataReader``: It is used to read data from data source

| ``SqlDataAdapter``: It works as a bridge between a DataSet and a data source to retrieve data.It can be used to fill the DataSet and update the data source |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Disconnected Mode

 ``DataSet``: It is used to initialize a new instance of the DataSet class

## Architecture

<img src="https://www.researchgate.net/profile/Syed-Rahman-5/publication/228997568/figure/fig1/AS:393865853980679@1470916345540/ADONET-Architecture.png" alt="archi" width="480" height="300"/>

## Stored Procedures

After adding stored procedure in the sql server our SqlCommand becomes:

                SqlCommand cmd = new SqlCommand()
                {
                    CommandText = "<stored procedure namme>",
                    Connection = connection_var,
                    CommandType = CommandType.StoredProcedure
                  
                };
                
                //if the procedure has parameters : 
                
                  SqlParameter param = new SqlParameter
                {
                    ParameterName = "@paramname", 
                    SqlDbType = SqlDbType.<type>, 
                    Value = "<VALUE>",
                    Direction = ParameterDirection.Input (or output)
                };
                
                cmd.Parameters.Add(param);

## Entity Framework

      Entity Framework (EF) is an open source object-relational mapping (ORM) framework for Ado.NET

 | <img src="https://static.javatpoint.com/tutorial/entity-framework/images/entity-framework-architecture.png" alt="archi" /> | **EDM (Entity Data Model)**: It is a set of concepts that describe the structure of data Conceptual model<br/> Mapping <br/>  Storage model.<br/>**LINQ** to Entities: is a query language used to write queries against the object model. It returns entities, which are defined in the conceptual model. <br/>**Entity SQL**:  is another query language just like LINQ to Entities. |
 | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Workflow

 | ModelFirst                                                                                                                          | DatabaseFirst                                                                         | CodeFirst                                                                                                                          |
 | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
 | Working on a visual diagram using the EF Designer and letting the ORM framework Entity Framework create/update the rest accordingly | building the Database and letting Entity Framework create/update the rest accordingly | writing the Data Model entity classes we’ll be using within our project and let Entity Framework generate the Database accordingly |
