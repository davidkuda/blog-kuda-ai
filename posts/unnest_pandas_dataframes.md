---
title: 'Flatten nested values in a pandas DataFrame'
slug: 'flatten_pandas_dataframes'
date: '2021-07-10'
---

Sometimes some columns carry a list as value. Sometimes a nested dictionary. And sometimes we want to automatically expand and flatten those lists and dictionaries into a larger dataframe. 

You can use [pandas.DataFrame.explode(pandas.DataFrame)](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.explode.html) on lists. This will transform the list into rows. And you can use [pandas.json_normalize(pandas.DataFrame)](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html?highlight=json_normalize#normalization) which will transform nested dictionaries into columns. You will need to drop the column that carried the nested dictionary and [merge](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.merge.html?highlight=merge#pandas.DataFrame.merge) with the flattened dataframe. 

Now you only need to scan if the value of a column is either a list or a dict and apply the corresponding method to unpack the values. The following code example shows how you can automatically detect a collection type and unnest / unpack these columns. 

```python
def unpack_collection_types(df: pd.DataFrame):
  """Explodes all lists and flattens all nested dicts of a df."""
    
  for col, data in df.iloc[0].items():

      if isinstance(data, list):
          df = df.explode(col, ignore_index=True)
          return unpack_collection_types(df)

      if isinstance(data, dict):
          df_flat = pd.json_normalize(df[col])
          df = df.drop(columns=[col])
          df_combined = pd.merge(df, df_flat, left_index=True, right_index=True, suffixes=('', f'({col})'))
          return unpack_collection_types(df_combined)
            
  return df
```