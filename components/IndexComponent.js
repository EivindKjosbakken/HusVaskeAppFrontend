import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const IndexComponent = () => {
  return (
    <>
      <Section title="Add">Adding</Section>

      <form action="javascript:void(0);" method="POST" onsubmit="addItem()">
        <input type="text" id="add-name" placeholder="New to-do" />
        <input type="submit" value="Add" />
      </form>

      <View>
        <h3>Edit</h3>
        <form action="javascript:void(0);" onsubmit="updateItem()">
          <input type="hidden" id="edit-id" />
          <input type="checkbox" id="edit-isComplete" />
          <input type="text" id="edit-name" />
          <input type="submit" value="Save" />
          <a onclick="closeInput()" aria-label="Close">
            &#10006;
          </a>
        </form>
      </View>
      <p id="counter"></p>
      <table>
        <tr>
          <th>Is Complete?</th>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
        <tbody id="todos"></tbody>
      </table>
      <script type="text/javascript">getItems();</script>
    </>
  );
};

export default IndexComponent;

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
