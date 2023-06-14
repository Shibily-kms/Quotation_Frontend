 <View style={styles.section}>
                    {/* Render JSON data as a table */}
                    <Text style={styles.heading}>Data Table</Text>
                    <View style={styles.table}>
                        {/* Render table headers */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Column 1</Text>
                            <Text style={styles.tableHeader}>Column 2</Text>
                        </View>
                        {/* Render table rows */}
                        {jsonData.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableData}>{item.column1}</Text>
                                <Text style={styles.tableData}>{item.column2}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Render JSON data as a text list */}
                    <Text style={styles.heading}>Data List</Text>
                    <View style={styles.list}>
                        {jsonData.map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                {item.column1} - {item.column2}
                            </Text>
                        ))}
                    </View>

                    {/* Render a paragraph */}
                    <Text style={styles.heading}>Paragraph</Text>
                    <Text style={styles.paragraph}>
                        This is a sample paragraph. You can add your own text here.
                    </Text>
                </View>